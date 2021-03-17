const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

const DB_USERNAME = 'root'
const DB_PASSWORD = ''

let conn

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
    .then((connection) => {
        conn = connection
        return connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
    })
    .then(() => {
        return conn.end()
    })
    .catch((err) => {
        console.warn(err.stack)
    })

const sequelize = new Sequelize('tw_exam', DB_USERNAME, DB_PASSWORD, {
    dialect: 'mysql',
    logging: false
})

let Homework = sequelize.define('homework', {
    student: Sequelize.STRING,
    content: Sequelize.STRING,
    grade: Sequelize.INTEGER
}, {
    timestamps: false
})


const app = express()

app.get('/create', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        const grades = [2, 5, 7, 7, 3, 10, 9, 4, 10, 8]
        for (let i = 0; i < 10; i++) {
            let homework = new Homework({
                student: `name${i}`,
                content: `some text here ${i}`,
                grade: grades[i]
            })
            await homework.save()
        }
        res.status(201).json({ message: 'created' })
    }
    catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/homeworks', async (req, res) => {
    try {
        let homeworks = await Homework.findAll();
        if (req.query.pass == "true") {
            homeworks = homeworks.filter(x => x.grade >= 5)
            res.status(200).json(homeworks)
        } else {
            res.status(200).json(homeworks)
        }

    }
    catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/homeworks/:id', async (req, res) => {
    try {
        let homework = await Homework.findByPk(req.params.id)
        if (homework) {
            if (req.headers['accept'] == "text/plain") {
                res.status(200).send(homework.content)
            } else {
                res.status(200).json(homework)
            }

        } else {
            res.sendStatus(404)
        }

    }
    catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: 'server error' })
    }
})

// missing endpoint

module.exports = app