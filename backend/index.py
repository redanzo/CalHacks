import json
import singlestoredb as s2
conn = s2.connect(host='svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com', port='3333', user='rishi-21',
                  password='c341LeVH7iXgZ4Kw16L2d2rMjYK0se6c', database='db_rishikeshan_3eeba')

def read_skills_from_file():
    try:
        with open('keywords.txt', 'r') as file:
            # Read the file and split the string into a list of skills
            skills = file.read().strip().split(', ')
        return skills
    except FileNotFoundError:
        return None


skills = read_skills_from_file()

skillString = ' '.join([f'+Skills:"{skill}"' for skill in skills])
query = f"SELECT Firstname, Lastname, Skills FROM db_rishikeshan_3eeba.`Freelancer` WHERE MATCH (TABLE db_rishikeshan_3eeba.`Freelancer`) AGAINST ('{skillString}') LIMIT 5;"

# query = "UPDATE db_rishikeshan_3eeba.`Freelancer` SET WalletAddress = '';"
# query = "SELECT * FROM db_rishikeshan_3eeba.`Freelancer`WHERE MATCH (TABLE db_rishikeshan_3eeba.`Freelancer`) AGAINST ('+Skills:\"Docker\" +Skills:\"Python\" +Skills:\"AWS\" +Skills:\"React\"') Limit 5;"

with conn.cursor() as cur:
    cur.execute(query)
    result = cur.fetchall()

    # Convert the result into a list of dictionaries
    freelancers = [
        {"first_name": row[0], "last_name": row[1], "skills": row[2]}
        for row in result
    ]

    # Write the list of dictionaries to a JSON file
    with open('freelancers.json', 'w') as f:
        json.dump(freelancers, f, indent=4)

print("Data has been written to freelancers.json")