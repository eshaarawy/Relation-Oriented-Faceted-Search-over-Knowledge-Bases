import networkx as nx 
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv('./input/triple.csv', nrows = 25)
data = data.drop('property', axis=1)


G=nx.DiGraph()
G.add_edges_from(data.values)

pos = nx.spring_layout(G)
nx.draw_networkx(G,pos)

plt.axis("on")
plt.savefig("default.png")
plt.show()

g.draw('file.pdf',prog='circo')
