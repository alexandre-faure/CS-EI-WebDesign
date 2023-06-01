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
    user_pseudo: { type: String },
    user_date_of_birth: { type: Date },
    user_password: { type: String, default:"password" },
    user_salt: { type: String, default:"salt" },
    user_pref_tri: { type: Number, default: 0 },
    user_pref_categories: { type: String, default: "" },
    user_pref_date_dbt: { type: Date, default: "00/00/0000" },
    user_pref_date_fin: { type: Date, default: "00/00/0000" },
  },
});

export default User;
