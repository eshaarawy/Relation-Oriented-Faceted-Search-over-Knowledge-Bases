# **CANDECOMP/PARAFAC project**

The system allows users to interactively explore relations between entities in knowledge bases (KBs), constructed or manipulated according the RDF standard : knowledge is stored in a structured form as (subject, predicate, object). The original authors propose a novel “relation facet” to ﬁnd relations between entities. To generate it, they applied clustering on predicates for grouping those predicates that are connected to common objects. Having generated clusters of predicates, the authors generated a facet according to the result. The authors propose a relation-oriented faceted search method for KBs that allows
users to explore relations between entities.
This system comes in a form of a web interface and allow the user to search over apredefinite KB and explore the relation between entities composing it.
\
\
The folder ```cpdecomposition``` contains all the code for clustering and application.
\
The folder ```Article_and_Summary``` contains all the documents used to produced and maintain the project (articles, ...)
\
The folder ```ressources_docs``` contains all the ressources used to produced documentation on distant repo.

## **I. System overview and description**

The architecture of the system proposed is transcribed as follows:
\
![System's architecture](/ressources_docs/overall_archi.png)
\
\
The web interface of the system in operation looks like this:
\
![Interface of the application](/ressources_docs/interface_system_facet.png)
\
\
This iterface is what is called on this project **RelFacetinterface** which is an iplementation of the so-called **faceted search**. 

### **Faceted search**

Faceted search is an exploratory search method for entities characterized by different properties. 
A facet is a field - other than a search result (often represented by \texttt{Extension}) - possessing a characteristic and a value (the latter may be Boolean or alphanumeric) enabling the search to be filtered on the RDF.database.
Users can browse interesting entities by selecting the facets and values that interest them, thus reducing the number of interesting entities.
\
The figure below is an example of the faceted search : \
![Example of facet exploration](/ressources_docs/example_facette.png)
\
***Note: facets here are transition markers.***
\
\
Users start from the initial state and move to another state. Each state has an extension that shows the set of elements (or entities) found by the search; an intent that shows the condition/query satisfied by the elements in the extension; and several facets and their values as transition markers, each of which leads to another state.
\
Typically, users perform an initial query, such as a keyword search, to obtain the initial extension, then repeatedly select and cancel facets to obtain renewed and filtered search results.
The interface presents several facets corresponding to the properties of the target entities, as well as their values and numbers of occurrences. Users can browse for entities of interest by selecting the facets and values that interest them, enabling filtering on entities.
\
The RelFacet interface method is the one selected and used by the system (describe as followed) : \
![RelFacet interface as describe up above this README](/ressources_docs/interface_system_facet.png)
\
\
When using the system, a keyword is entered, its scope (subject or object) is defined and then, according to this same keyword, facets can be parameterized to explore the relationships concerning it.

### **Application code architecture and associate**

The proposed system runs on a local machine, using **NodeJS**, **Python** and **PostGreSQL**.
The database has to be filled in by hand, as the system doesn't take care of it automatically. The system interface is a Web interface, openable after execution in a browser. The data to be populated in the database are obtained from the clusters when the CANDECOMP/PARAFAC(CP) algorithm is run.
Here are a number of diagrams (which we'll go into in greater detail later) showing, from my own point of view, how the system is built via code (which is very similar to the architecture proposed) :
\
![Overall organization of the code](/ressources_docs/overall_archi_code.png)
\
\
The code is separated into three large modules: the clustering modules, the application code and the database.

As a result, the clustering code is organized as follows (***brown for input, green for output, red for both***):
\
![Organization of the clusterig code](/ressources_docs/clustering_archi.png)
\
\
Each rectangle contains the name of a Jupyter Notebook file (Python language) with a specific function (explained in a README on the project's GitLab repository). They perform the function of clustering and visualizing data in the RDF database (work is still in progress on this, concerning perpetuation/documentation/simplification).
\
\
\
Finally, the organization of the application code is as follows :
\
![Organization of the application code](/ressources_docs/application_archi.png)
\
Each rectangle shows the name of a NodeJS file, and the arrows show its dependencies.

## **II. Technical handling of the project so far**

### **Versions used**

OS: Fedora Linux 39
Python: 3.12.1
NodeJs : 20.10.0
NPM    : 10.2.3
PostGreSQL : 15.4

### **How to get started**

Please refer to the sub-README made in the sub directories.

## **III. Useful links** : 
 - https://www.emerald.com/insight/content/doi/10.1108/IJWIS-03-2021-0035/full/html (*main working article*)
 - https://dl.acm.org/doi/10.1145/3428757.3429254 (*given at by original developper but out of date*)
 - https://oratosa.github.io/index_en.html  (*link to the articles produced by the original developper*)
 - https://www.dropbox.com/scl/fi/ltarwbsgqqlu8etqblsz7/main.pdf?rlkey=c2epetxso1nefq5k2w4djymgi&dl=0 (master thesis about the project, BEWARE : it is in Japanese so yu'll probably have to translate it)
