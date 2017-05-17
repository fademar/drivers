# Technical Test - Driver state

> Expected completion time: a few hours <br/>
> Preferred languages are [Node.js](https://nodejs.org/en/) and [ReactJS](https://github.com/facebook/react)

## Purpose

Build an application allowing anyone to view on a map the real-time state and position of our drivers in a geographical zone.

### Backend

The states are read from the RabbitMQ exchange `drivers` with the routing key `drivers.update`. Their anatomy is:

```json
{
  "id": "{string} [DRIVER_ID]",
  "state": "(available|ride|...)",
  "position": [ "{number} latitude", "{number} longitude" ]
}
```

The RabbitMQ connection string is: [amqp://guest:guest@localhost:5672](amqp://guest:guest@localhost:5672).

*The rest is up to you :)*

### Frontend

The front application must display in **real-time** on a **map** the **states** and the **positions** of all the drivers in the current **geographical zone**. The zoom and the pan must be available. The total number of drivers in the zone must be displayed.

### Before starting

Read the following section to start the drivers' states emission worker. This will initialize the RabbitMQ server as well as the states producer you will consume for your application.

[Starting the states' producer](./producer)