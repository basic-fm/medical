tables = [
    "medical_project",
    "medical_place",
    "medical_parcel",
    "medical_delivery_parcels",
    "medical_delivery",
    "medical_car",
    "medical_receit",
]

for t in tables:
    print(f"SELECT setval('{t}_id_seq', (SELECT MAX(id) FROM {t}));")
