import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body

        const isUsed = await User.findOne({ email })

        if (isUsed) {
            return res.status(402).json({
                message: 'Данный username уже занят.'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            email,
            username, 
            password: hash
        })

        const token = jwt.sign(
            {
                id: newUser._id
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            } 
        )

        await newUser.save()

        res.json({
            newUser, 
            token,
            message: 'Регистрация прошла успешно.'
        })
    } catch (error) {
        res.status(400).json({
            message: 'Ошибка при создании пользователя.'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(403).json({
                message: 'Такого пользователя не существует.'
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            res.stauts(403).json({
                message: 'Неверный логин или пароль.'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            } 
        )

        res.json({
            token,
            user,
            message: 'Авторизация прошла успешно!'
        })
    } catch (error) {
        res.status(401).json({
            message: 'Ошибка при авторизации.'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(403).json({
                message: 'Такого пользователя не существует.'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(403).json({
            message: 'Нет доступа.'
        })
    }
}