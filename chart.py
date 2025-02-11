import matplotlib.pyplot as plt
import networkx as nx

def create_decision_tree():
    G = nx.DiGraph()
    
    # Nodes
    nodes = {
        "start": "START",
        "state": "Do you need to store a state?",
        "multiple_writers": "Are there multiple writers?",
        "ttp": "Can you use an always-online trusted third party (TTP)?",
        "writers_known": "Are all writers known?",
        "writers_trusted": "Are all writers trusted?",
        "public_verifiability": "Is public verifiability required?",
        "no_blockchain": "Do not use a blockchain.",
        "traditional_db": "Use a traditional database.",
        "public_blockchain": "Use a public blockchain.",
        "consortium_blockchain": "Use a consortium blockchain.",
        "private_blockchain": "Use a private permissioned blockchain."
    }
    
    # Adding edges
    edges = [
        ("start", "state"),
        ("state", "no_blockchain", {"label": "No"}),
        ("state", "multiple_writers", {"label": "Yes"}),
        ("multiple_writers", "traditional_db", {"label": "No"}),
        ("multiple_writers", "ttp", {"label": "Yes"}),
        ("ttp", "traditional_db", {"label": "Yes"}),
        ("ttp", "writers_known", {"label": "No"}),
        ("writers_known", "public_blockchain", {"label": "No"}),
        ("writers_known", "writers_trusted", {"label": "Yes"}),
        ("writers_trusted", "consortium_blockchain", {"label": "Yes"}),
        ("writers_trusted", "public_verifiability", {"label": "No"}),
        ("public_verifiability", "public_blockchain", {"label": "Yes"}),
        ("public_verifiability", "private_blockchain", {"label": "No"})
    ]
    
    for edge in edges:
        if len(edge) == 3:
            G.add_edge(edge[0], edge[1], label=edge[2]["label"])
        else:
            G.add_edge(edge[0], edge[1])
    
    return G, nodes

def draw_decision_tree(G, nodes):
    pos = nx.drawing.nx_agraph.graphviz_layout(G, prog="dot")
    labels = {key: nodes[key] for key in G.nodes()}
    edge_labels = {(u, v): G[u][v]['label'] for u, v in G.edges() if 'label' in G[u][v]}
    
    plt.figure(figsize=(10, 8))
    nx.draw(G, pos, with_labels=True, labels=labels, node_size=3000, node_color="lightblue", font_size=9, font_weight="bold", edge_color="gray")
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=8, font_color="red")
    plt.show()

G, nodes = create_decision_tree()
draw_decision_tree(G, nodes)