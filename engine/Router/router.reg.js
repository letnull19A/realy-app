const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('./../Models/User');
const router = Router();

router.post('/reg',
    [
        check('email', "Некорректный E-Mail").isEmail(),
        check('password', "Некорректный пароль")
            .isLength({
                min: 8,
                max: 255,

            }),
        check('telephone', "Некорректный номер телефона!").isMobilePhone(),
        check('name', "Поле Имя не должно пустовать!")
            .isLength({
                min: 1,
                max: 255
            }),
        check('surname', "Поле Фамилия не должно пустовать!")
            .isLength({
                min: 1,
                max: 255
            }),
        check('fatherName', "Поле Отчество не должно пустовать!")
            .isLength({
                min: 1,
                max: 255
            }),
        check('login', "Не корректное поле Логина")
            .isLength({
                min: 8,
                max: 255
            })
    ],
    async (req, res) => {

    try {

        var message, errors;

        errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: "Некорректные данные!"
            })
        }

        const { login, password, email, status, name, surname, fatherName, telephone } = req.body;

        const isExist = await User.findOne({ login, email, telephone });

        if (!isExist) {

            var hashedPassword = await bcrypt.hash(password, 16);
            var user = new User({ 
                    login, 
                    password: hashedPassword, 
                    email, 
                    status: 0, 
                    name, 
                    surname, 
                    fatherName,
                    telephone, 
                    id
                });

            await user.save();

            message = "Пользователь зарегистрирован!";
        } else {
            message = "Пльзователь с такими данными существует!";
        }
        

        res.status(200).json({ message: message });

    } catch (e) {
        return res.status(500).json({message: "Registration error!" + e});
    }

});

module.exports = router;