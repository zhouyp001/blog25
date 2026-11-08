\# **edges通过设置不同的边显示不同的效果**
nx.draw_networkx_edges(G, pos, width=1.0, alpha=0.5)#首先将所有边全部设置
nx.draw_networkx_edges(G, pos,
                       edgelist=[(0, 1), (1, 2), (2, 3), (3, 0)],
                       width=8, alpha=0.5, edge_color='r')#再设置一部分边
nx.draw_networkx_edges(G, pos,
                       edgelist=[(4, 5), (5, 6), (6, 7), (7, 4)],
                       width=8, alpha=0.5, edge_color='b')#再设置另一部分边

\#**设置边颜色的深浅**
nodes = nx.draw_networkx_nodes(G, pos, node_size=node_sizes, node_color='blue')
\#获得边的对象列表
edges = nx.draw_networkx_edges(G, pos, node_size=node_sizes, arrowstyle='->',
                               arrowsize=10, edge_color=edge_colors,
                               edge_cmap=plt.cm.Blues, width=2)
\# **set alpha value for each edge设置每一条边的状态**
for i in range(M):
    edges[i].set_alpha(edge_alphas[i])

pc = mpl.collections.PatchCollection(edges, cmap=plt.cm.Blues)#设置旁边比较条
pc.set_array(edge_colors)
plt.colorbar(pc)

\#**找到需设置边列表的技巧**
elarge=[(u,v) for (u,v,d) in G.edges(data=True) if d['weight'] >0.5]
esmall=[(u,v) for (u,v,d) in G.edges(data=True) if d['weight'] <=0.5]

\# **edges**
nx.draw_networkx_edges(G,pos,edgelist=elarge,width=6)
nx.draw_networkx_edges(G,pos,edgelist=esmall,width=6,alpha=0.5,edge_color='b',style='dashed')

\# **labels**
nx.draw_networkx_labels(G,pos,font_size=20,font_family='sans-serif')