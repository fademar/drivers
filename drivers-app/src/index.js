import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const amqplib = require('amqplib');

const AMQP_URL = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672';
const EXCHANGE = 'drivers';
const ROUTING_KEY = 'drivers.update';
const QUEUE = 'update_drivers';

let client;
let q;

/**
 * Start the connection to RabbitMQ, assert the Queue and bind the Exchange to the Queue * 
 */
async function start() {
  console.log('Connection to RabbitMQ');
  client = await amqplib.connect(AMQP_URL);
  client.channel = await client.createChannel();
  await client.channel.assertExchange(EXCHANGE, 'topic', {
    durable: false
  });
  q = await client.channel.assertQueue(QUEUE, {
    durable: false
  });
  
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue)
  
  await client.channel.bindQueue(q.queue, EXCHANGE, ROUTING_KEY);
  
  client.channel.consume(q.queue, function(msg) {
    console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
  }, {noAck: true});

}

start();


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
