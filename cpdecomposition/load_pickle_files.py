import pickle

with open('./cpdecomposition/output/dict_ent.pkl','rb') as f:
    entities = pickle.load(f)
    print("="*50)
    print("ENTITIES TYPE IS : ", type(entities))
    print("Length :" ,len(entities))
    k = 0
    for i in entities.items():
        print(i)
        k+=1
        # this break condition can be delete if you want
        if k>20:
            break
    print("="*50)
    f.close()

with open('./cpdecomposition/output/dict_sub.pkl','rb') as f:
    subjects = pickle.load(f)
    print("="*20)
    print("SUBJECT TYPE IS : \n", type(subjects))
    print("Length :", len(subjects))
    k = 0
    for i in subjects.items():
        print(i)
        k+=1
        # this break condition can be delete if you want
        if k>20:
            break
    print("="*20)
    f.close()

with open("./cpdecomposition/output/dict_obj.pkl","rb") as f:
    pickle.load(f)

with open("./cpdecomposition/output/dict_prop.pkl","rb") as f:
    properties = pickle.load(f)
    print("="*50)
    print("PROPERTIES TYPE IS : ", type(properties))
    print("Length :" ,len(properties))
    for i in properties.items():
        print(i)
    print("="*50)
    f.close()