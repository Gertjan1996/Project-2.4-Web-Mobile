let users = { // Hardcoded - MongoDB connection in the future
  1: {
    id: '1',
    username: 'Gertjan_Haan',
    email: 'gertjanhaan@live.nl',
    password: 'adminadmin',
    role: 'Admin'
  },
  2: {
    id: '2',
    username: 'Jun_Lin',
    email: 'junlin@live.nl',
    password: 'adminadmin',
    role: 'Admin'
  }
}
  
let categories = { // Hardcoded - MongoDB connection in the future
  1: {
    id: '1',
    category: 'Voetbal',
    imgPath: 'path_to_img_resource'
  },
  2: {
    id: '2',
    category: 'Hockey',
    imgPath: 'path_to_img_resource'
  }
}
  
let posts = { // Hardcoded - MongoDB connection in the future
  1: {
    id: '1',
    text: 'Test Post nr. 1 van user met userId 1 in categorie met categoryId 1',
    userId: '1',
    categoryId: '1'
  },
  2: {
    id: '2',
    text: 'Test Post nr. 2 van user met userId 2 in categorie met categoryId 2',
    userId: '2',
    categoryId: '2'
  }
}

export default {
  users,
  categories,
  posts
}