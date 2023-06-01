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
    user_password: { type: String, },
    user_salt: { type: String },
    user_pref_tri: { type: Number, default: 0 },
    user_pref_categories: { type: String, default: "" },
    user_pref_date_dbt: { type: Date, nullable: true, default: "" },
    user_pref_date_fin: { type: Date, nullable: true, default: "" },
  },
});

export default User;
