import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    user_id: {
      primary: true,
      type: Number,
      generated: true,
    },
    user_email: {
      type: String,
      unique: true,
    },
    user_firstname: { type: String },
    user_lastname: { type: String },
    user_date_of_birth: { type: Date },
    user_password: { type: String },
    user_salt: { type: String },
  },
});

export default User;
