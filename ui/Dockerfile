FROM node:20 as builder
WORKDIR /app
ARG REACT_APP_API_BASE_URL=http://localhost:9000/api/v1.0
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
