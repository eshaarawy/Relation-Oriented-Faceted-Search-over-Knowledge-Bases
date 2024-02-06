# **CANDECOMP/PARAFAC codes**

## **Introduction**

The following description are related to the clustering method, the files produced to do it and test it, alongside with the files to obtain pieces of database's datas.
As a recall, the files (in Jupyter notebook files), are organied as follow :
\
\
![Organization of the clusterig code](/ressources_docs/clustering_archi.png)
\
\
\
\
All the Jupyter files here remains mostly unmodified (except for comments).
\
The folder ```facetsearchsystem-work``` contains all the code for the application.
\
The folder ```input``` contains inputs/working datas used to produce clusters.
\
The folder ```output``` contains all the outputs/working datas used to check results and also fill the database.

## **Infos/Disclaimer**

**<span style="color: red;">
IF ANY DATE IS MENTIONNED IN THIS README ----> it will be in 'DD/MM/YYYY' format.
</span>**

\
The differents codes are describe in this file according the following scheme :

- Name of the code module *(FR : Le nom du module de code)*
- Module version *(FR : La version du module de code)*
- Module description *(FR : La description du module de code)*
- Module dependencies *(FR : Les dépendances du module de code)*
- Module authors *(FR : Les auteurs du module)*
- Associated licences *(FR : Les licences associées au module)*
- Instructions for installation and use *(FR : Les instructions d'installation et d'utilisation)* 
- Other intructions and configuration parameters *(FR : Instructions et des paramètres de configuration)*

## **Python files**

### **load pickle files**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `load_pickle_files.py`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    The code read from an input data file (.pkl in ~/output folder) and extract the datas from it, then displays the datas alongside with its original type (coded to know how it was stored and how it looks)
- **Module dependencies**\
    Python interpreter\
    Python packages : pickle
- **Module authors**\
    Code : Hugo Triolet\
    Documentation : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Either executable on VSCode or any other Python interpreter. 
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>

### **pagerank on entities**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `pagerank_entities.py`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    The code, according to the triples, browse the subjects after constructing the graph between subjects and objects (droping the properties), and make the pagerank on them according to that graph. Then, it do SPARQL requests on each entity to extract the abstract out of them in DBpedia.
- **Module dependencies**\
    Python interpreter\
    Python packages : pandas, networkx, SPARQLWrapper, time, csv
- **Module authors**\
    Code : Hugo Triolet\
    Documentation : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    <span style="color: red;">
    ***Beware !!! : since the number of entities is huge (aroud 320 000), it takes around 12 hours to execute on a very good personnal PC. It is advised to execute it on a remote Cloud computer or a server***
    </span>\
    Either executable on VSCode or any other Python interpreter. 
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>

## **Jupyter Notebook files**

### **AHCtoJaccardMatrixOfPred notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `AHCtoJaccardMatrixOfPred.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    The code read from an input data file (.csv in ~/input folder). Both properties-subjects and properties-objects are extrated.
    Then an AHC is performed on them by before that transformed them into a average Jaccard matrix and compute the Jaccard distance matrix.
    The result is display via matplotlib (into the notebook).
    *This module is the one used to perform the clustering on the triples in order to create the facets. There is no output (need to create one to fetch the results)*
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : pandas, numpy, collections, scipy (.spatial, .cluster), matplotlib (.pyplot)
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use 
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>

### **Analysis_graph notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `analysis_graph.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    The notebook read an ```input.csv``` and construct the graph assoociated to the datas extracted --> extract triples from an RDF database, drop the property field and construct the RDF graph (and save it as a *.png* file).
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : pandas, networkx, matplotlib.pyplot, pygraphviz\
    Linux packages : libgraphviz-dev
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    <span style="color: red;">
    ***Beware !!! : since the input file is huge (aroud 720 000 lines), it is advised to execute it on a remote Cloud computer or a server***
    </span>\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.\
    Both ```pygraphviz``` and ```libgraphviz-dev``` are installed via command lines put into the code.
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>


### **Analysis_graph2 notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `analysis_graph.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    The notebook read an ```triple.csv``` and construct the graph assoociated to the datas extracted --> extract triples from an RDF database, drop the property field and construct the RDF graph. Unlike the construction of the graph in the previous notebbok, below it isn't saved as an image but the code test if whether or not the grpah is weakly connected.
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : networkx, pandas
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    <span style="color: red;">
    ***Beware !!! : since the input file is huge (720 000 lines), it is advised to execute it on the Cloud or with a decent machine***
    </span>\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.
- **Other intructions and configuration parameters**
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>


### **Analysis_prop notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `analysis_prop.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    ***TO EDIT IF NOT WELL DESCRIBE***\
    Open an output (dictionnary of property in *key : value* form), swap it in *value : key* form. Then calculate the score of each property with the help of a loaded output of property scores. Retrieve an array of property scores in descending order by index. Make a list converted to URIs by referring to a dictionary. Combine the ranking list of properties for all indexes (pf) in a multidimensional array and save it in a output file *result_eep300.csv*.
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : pickle, numpy, pandas
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.\
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>


### **Analysis_prop_20210323 notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `analysis_prop_2021032.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    ***TO EDIT IF NOT WELL DESCRIBE***\
    Open an output (dictionnary of property in *key : value* form), swap it in *value : key* form. Then calculate the score of each property with the help of a loaded output of property scores. Retrieve an array of lambdas scores in descending order by index. Make a list converted to URIs by referring to a dictionary. Combine the lambda ranking list of properties for all indexes (pf) in a multidimensional array and save it in a output file *result_sop300_20210323.csv*.
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : pickle, numpy, pandas
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>


### **Data_transition_to_matlab notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `data_transition_to_matlab.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    Open a ```triple.csv``` wbelow we extract the subjects, properties and objects in separated data structures. IT IS EXTRACTED AS UNIQUE (no double or more for each of them). It is treated, reconstruct as a triple and save it separately into a matlab-friendly file *.pkl* each corresponding to the field of the triple it treat (one for subject, one for properties and one for objects). It saves also the shape of the tensor and the indexes of the triples.
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : pandas, numpy
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>

### **Tensorly_n_sparse notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `tensorly_n_sparse.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    Extract triples from RDF datbase, split the properties from the couples (subject, object) and make sure to let only unique couples/porperties remain. Then construct a tensor from those and <span style="color: green;">**application of the PARAFAC algorithm**</span> on it (calculation of the computation time it took).
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : time, tensorly, sparse, numpy, pandas
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>

### **Tf_sparse_tensor notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `tf_sparse_tensor.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    ***DON'T WELL UNDERSTAND THE UTILITY OF THIS NOTEBOOK***\
    Extract triples of a RDF database and group them by properties. Group also by properties to calculate the size of each group made. Divide then the triple into subjects, properties and objects. Creation of a fully-filled-zero tensor from them.
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : pandas, tensorflow, math, numpy, torch
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.\
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>

### **Trial_tensord notebook**
<details><summary>Description (below)</summary>

- **Name of the code module**\
    `trial_tensord.ipynb`
- **Module version**\
    No version so far (03/10/2023)
- **Module description**\
    Notebook serving to train a model to do the <span style="color: green;">**CP Decomposition**</span>.
- **Module dependencies**\
    Jupyter Notebook (or whatever that can run .ipynb files)\
    Python packages : tensorflow, os, sys\
    Library on GitHub : *tensorD, download into the code*
- **Module authors**\
    Code : Taro Aso\
    Documentation and minor changes : Hugo Triolet
- **Associated licences**\
    No licence so far (03/10/2023)
- **Instructions for installation and use**\
    Open a Jupyter Notebook, open the file containing the code and it is ready to use.
- **Other intructions and configuration parameters**\
    Make sure your inputs and/or outputs are accessible via the path ```./input/~``` and/or ```./output/~``` otherwise change it to match your own folder organization.
</details>


