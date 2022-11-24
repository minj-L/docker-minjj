# Step 1
FROM node:16

# Step 2
WORKDIR /usr/src/app
  
# Step 3
RUN git clone https://github.com/minj-L/docker-minjj
WORKDIR /node
RUN npm install

# Step 4
#ADD https://github.com/minj-L/anew/blob/main/node/test ./ 
#COPY app.js ./

# Step 5
EXPOSE 3000

# Step 6
CMD ["node", "app.js"]
