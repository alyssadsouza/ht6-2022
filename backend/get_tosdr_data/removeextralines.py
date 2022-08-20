import csv
import sys

maxInt = sys.maxsize

while True:
    # decrease the maxInt value by factor 10 
    # as long as the OverflowError occurs.

    try:
        csv.field_size_limit(maxInt)
        break
    except OverflowError:
        maxInt = int(maxInt/10)

with open('data.csv', 'r') as csv_read, open('propdata.csv', 'w') as csv_write:
    spamreader = csv.reader(csv_read, delimiter=',')
    spamwriter = csv.writer(csv_write, delimiter=',')
    for row in spamreader:
        if row != []:
            spamwriter.writerow(row)