import requests, json, csv

with open('apitosdrorg.json') as json_file, open('data.csv', 'w') as csv_file:
    all_data = json.load(json_file)
    for i, service in enumerate(all_data['parameters']['services']):
        if service['is_comprehensively_reviewed']:    
            service_id = all_data['parameters']['services'][i]['id']
            response = requests.get('https://api.tosdr.org/service/v1/?service=' + str(service_id))
            response_json = response.json()
            docs_json = response_json['parameters']['documents']
            points_json = response_json['parameters']['points']
            tags = ['<p>','</p>','<br>','</br>','<li>','</li>','<ul>','</ul>','<ol>','</ol>','<em>','</em>','<blockquote>','</blockquote>','<strong>','</strong>']   

            docs_string = ''
            points_string = ''

            spamwriter = csv.writer(csv_file, delimiter=',')

            for doc in docs_json:
                temp_str = doc['text']
                if temp_str != None:
                    for tag in tags:
                        temp_str = temp_str.replace(tag,"")
                    temp_str = temp_str.replace('\"',"")
                    temp_str = temp_str.replace("\n","").replace("\r","")
                    docs_string += temp_str

            for point in points_json:
                if point['status'] == 'approved':
                    points_string += point['title']
                    points_string += ". "
            
            points_string = points_string.replace('\"',"")

            docs_encode = docs_string.encode("ascii","ignore")
            docs_string = docs_encode.decode()

            points_encode = points_string.encode("ascii","ignore")
            points_string = points_encode.decode()
            
            spamwriter.writerow([docs_string, points_string])
    

    # for num in all_data['parameters']['services']:
    #     print(num['id'])