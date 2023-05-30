import typeorm from 'typeorm';

const Category = new typeorm.EntitySchema({
  name: 'Category',
  columns: {
    category_id: {
      primary: true,
      type: Number,
    },
    category_title: {
      type: String,
    },
  },
});

export default Category;
