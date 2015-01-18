#!/bin/bash
testip=54.209.43.90
productionip=54.88.187.36

if [ "$1" = "prod" ]; then
echo changing ips to production environment
for file in www/js/controllers/*.js
do
echo $file
sed -i.bak "s/$testip/$productionip/g" $file
done
for file in www/js/*.js
do
echo $file
sed -i.bak "s/$testip/$productionip/g" $file
done
rm www/js/*.bak
rm www/js/controllers/*.bak

elif [ "$1" = "test" ]; then
echo changing ips to testing environment

for file in www/js/controllers/*.js
do
echo $file
sed -i.bak "s/$productionip/$testip/g" $file
done
for file in www/js/*.js
do
echo $file
sed -i.bak "s/$productionip/$testip/g" $file
done
rm www/js/*.bak
rm www/js/controllers/*.bak

else
echo ERROR: test and prod are the only directions available
fi


#for file in www/js/controllers/*.js
#do
#	echo $file
#	sed -i.bak 's/54.209.43.90/54.88.187.36/g' $file
#done
#for file in www/js/*.js
#do
#	echo $file
#	sed -i.bak 's/54.209.43.90/54.88.187.36/g' $file
#done
