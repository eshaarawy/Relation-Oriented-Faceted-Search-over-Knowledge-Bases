import networkx as nx 
import pandas as pd
from SPARQLWrapper import SPARQLWrapper, JSON
import time
import csv

data = pd.read_csv('./cpdecomposition/input/triple.csv')
data = data.drop('property', axis=1)

G = nx.DiGraph()
G.add_edges_from(data.values)

##############################################
# PAGERANKINK THE ENTITIES
##############################################
pr = nx.pagerank(G)

""" k = 0
# display 20 examples of entities
for key in pr:
    if k < 20:
        print("RESSOURCE : ", key, " WITH A PAGERANK OF ", pr[key])
        k += 1
    else:
        break """

##############################################
# SPARQL REQUEST TO EXTRACT THE DOCUMENT FIELD
##############################################

# get the start time
st = time.time()

# Set up the SPARQL endpoint for DBpedia
endpoint_url = "https://dbpedia.org/sparql"

# Create a SPARQLWrapper object, set the endpoint URL
sparql = SPARQLWrapper(endpoint_url)

# Specify the format you want the results to be returned in (JSON in this case)
sparql.setReturnFormat(JSON)

k = 0
without_abs = 0     # counter on entities without abstract
tot_entities = 0    # counter on total number of entities
abstracts = {}      # dictionary

for entity in pr:

    # THOSE TWO ARE MEANT TO BE COMMENT IF 
    # THE EXHAUTIVE FECTH IS WANTED
    if k > 20:
        break

    # Define the resource URI for which you want to fetch the abstract
    resource_uri = str(entity)

    # Write the SPARQL query to retrieve the abstract of the resource
    query = f"""
    PREFIX dbpedia: <http://dbpedia.org/resource/>
    PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
    SELECT ?abstract 
    WHERE {{ 
        <{resource_uri}> dbpedia-owl:abstract ?abstract .
        FILTER (langMatches(lang(?abstract),"en"))
    }}
    """

    # Set the query string
    sparql.setQuery(query)

    # Execute the SPARQL query and process the results
    results = sparql.query().convert()

    # Extracting the content of the abstract
    if "results" in results and "bindings" in results["results"]:
        bindings = results["results"]["bindings"]
        if len(bindings) > 0:
            for binding in bindings:
                abstract = binding["abstract"]["value"]
                abstracts[entity] = abstract
                tot_entities += 1
                #print("Abstract found for ", entity)
        else:
            abstracts[entity] = entity
            tot_entities += 1
            without_abs += 1
            #print("Abstract NOT found for ", entity)
    else:
        continue
        #print("No results or bindings found.")
    
    k += 1 #TO COMMENT IF THE EXHAUTIVE FETCH IS WANTED

# get the end time
et = time.time()

# get the execution time
elapsed_time = et - st
if elapsed_time > 60:
    print('Execution time:', round(elapsed_time/60, 2), 'minutes')
else:
    print('Execution time:', round(elapsed_time, 2), 'seconds')

# Percentage of entities without an abstract (entity removed or just a third-tier web site)
print("There is : ", round(100*without_abs/tot_entities, 3), "%"+" of the treated entities without an abstract...")


##############################################
# save {entity, document, pagerank} into a csv
##############################################

# List of dictionaries
ent_doc_pagrank = []

# Rearrange the datas
for entity in abstracts:
    ent_doc_pagrank.append({'resource' : entity, 
                            'document' : abstracts[entity],
                            'pagerank' : pr[entity]
                        })

# Specify the file path for the CSV file
file_path = './cpdecomposition/output/entity_database_file.csv'

# List of field names (header) for the CSV file
field_names = ['resource', 'document', 'pagerank']

# Open the CSV file in write mode
with open(file_path, mode='w', newline='') as file:
    # Create the CSV writer object with the field names as the header
    writer = csv.DictWriter(file, fieldnames=field_names)

    # Write the header row
    writer.writeheader()

    # Write data into the CSV file
    writer.writerows(ent_doc_pagrank)

print("Data saved to CSV successfully.")