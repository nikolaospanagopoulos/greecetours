import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'nikos pan',
        email:'nikos4222@example.com',
        password:bcrypt.hashSync('123456',10),
        
    },
    {
        name:'panaras254',
        email:'panaras254@example.com',
        password:bcrypt.hashSync('123456',10),
        
    },
]

export default users