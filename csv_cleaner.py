import csv

k_frame_count = 2101
k_skip_frame = 5

for idx in range(1, k_frame_count, k_skip_frame):
    org_filename = 'data/csv_org/%s.csv' % idx
    new_filename = 'data/csv/%s.csv' % idx
    with open(org_filename) as input_csv:
        with open(new_filename, 'w') as output_csv:
            csv_writer = csv.writer(output_csv)
            row_id = 0
            for row in csv.reader(input_csv):
                row_id = row_id + 1
                if row_id % 2 == 0: continue
                x = (int(float(row[0])))
                y = (int(float(row[1])))
                z = (int(float(row[2])))
                w = (int(float(row[3])))

                if x < 0 or x > 170:    continue
                if y < 30 or y > 220:   continue
                if z > 0 or z < -130:   continue

                csv_writer.writerow([x,y,z,w])