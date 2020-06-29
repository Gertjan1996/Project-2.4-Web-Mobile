import bcrypt from 'bcryptjs'
import models from '../models'

// Iniitial data section
const seedDb = async () => { // Database seeding
  const user1 = new models.User({
    username: 'Gertjan',
    hash: bcrypt.hashSync('adminadmin', 10),
    email: 'gertjan@live.nl',
    role: 'Admin'
  })
  const user2 = new models.User({
    username: 'Jun',
    hash: bcrypt.hashSync('adminadmin', 10),
    email: 'jun@live.nl',
    role: 'Admin'
  })
  const user3 = new models.User({
    username: 'NormalUser',
    hash: bcrypt.hashSync('useruser', 10),
    email: 'user@live.nl'
  })
  const category1 = new models.Category({
    category: 'Fitness',
    imgPath: 'logo.svg'
  })
  const category2 = new models.Category({
    category: 'Hardlopen',
    imgPath: 'logo.svg'
  })
  const category3 = new models.Category({
    category: 'Voetbal',
    imgPath: 'logo.svg'
  })
  const category4 = new models.Category({
    category: 'Zwemmen',
    imgPath: 'logo.svg'
  })
  const category5 = new models.Category({
    category: 'Tennis',
    imgPath: 'logo.svg'
  })
  const category6 = new models.Category({
    category: 'Fietsen',
    imgPath: 'logo.svg'
  })
  const category7 = new models.Category({
    category: 'Yoga',
    imgPath: 'logo.svg'
  })
  const category8 = new models.Category({
    category: 'Hockey',
    imgPath: 'logo.svg'
  })
  const category9 = new models.Category({
    category: 'Paardrijden',
    imgPath: 'logo.svg'
  })
  const category10 = new models.Category({
    category: 'Golf',
    imgPath: 'logo.svg'
  })
  const category11 = new models.Category({
    category: 'Wielrennen',
    imgPath: 'logo.svg'
  })
  const category12 = new models.Category({
    category: 'Overig',
    imgPath: 'logo.svg'
  })
  const post1 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    user: user1.id,
    category: category1.id
  })
  const post2 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque,',
    user: user2.id,
    category: category1.id
  })
  const post3 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis ',
    user: user3.id,
    category: category1.id
  })
  const post4 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum,',
    user: user1.id,
    category: category1.id
  })
  const post5 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. Sed mattis eros vitae congue volutpat. Nam non odio at lorem suscipit rhoncus et id nisi. Etiam sed sapien id dolor commodo finibus vel finibus sem.',
    user: user2.id,
    category: category1.id
  })
  const post6 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere.',
    user: user3.id,
    category: category1.id
  })
  const post7 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    user: user3.id,
    category: category2.id
  })
  const post8 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    user: user1.id,
    category: category2.id
  })
  const post9 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. Sed mattis eros vitae congue volutpat. Nam non odio at lorem suscipit rhoncus et id nisi. Etiam sed sapien id dolor commodo finibus vel finibus sem.',
    user: user2.id,
    category: category3.id
  })
  const post10 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. ',
    user: user3.id,
    category: category3.id
  })
  const post11 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    user: user1.id,
    category: category4.id
  })
  const post12 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. Sed mattis eros vitae congue volutpat. Nam non odio at lorem suscipit rhoncus et id nisi. Etiam sed sapien id dolor commodo finibus vel finibus sem.',
    user: user2.id,
    category: category4.id
  })
  const post13 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. ',
    user: user3.id,
    category: category5.id
  })
  const post14 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce',
    user: user1.id,
    category: category5.id
  })
  const post15 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, ',
    user: user2.id,
    category: category6.id
  })
  const post16 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. ',
    user: user3.id,
    category: category6.id
  })
  const post17 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. Sed mattis eros vitae congue volutpat. Nam non odio at lorem suscipit rhoncus et id nisi. Etiam sed sapien id dolor commodo finibus vel finibus sem.',
    user: user1.id,
    category: category7.id
  })
  const post18 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gr',
    user: user2.id,
    category: category7.id
  })
  const post19 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. ',
    user: user3.id,
    category: category8.id
  })
  const post20 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. Sed mattis eros vitae congue volutpat. Nam non odio at lorem suscipit rhoncus et id nisi. Etiam sed sapien id dolor commodo finibus vel finibus sem.',
    user: user1.id,
    category: category8.id
  })
  const post21 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat.',
    user: user2.id,
    category: category9.id
  })
  const post22 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. Sed mattis eros vitae congue volutpat. Nam non odio at lorem suscipit rhoncus et id nisi. Etiam sed sapien id dolor commodo finibus vel finibus sem.',
    user: user3.id,
    category: category9.id
  })
  const post23 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum.',
    user: user1.id,
    category: category10.id
  })
  const post24 = new models.Post({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo bibendum, mattis quam pellentesque, fringilla mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida venenatis nunc id placerat. Maecenas dictum porta elementum. Fusce semper erat eget mauris maximus, eget vestibulum urna posuere. Sed mattis eros vitae congue volutpat. Nam non odio at lorem',
    user: user2.id,
    category: category10.id
  })
  await user1.save()
  await user2.save()
  await user3.save()
  await category1.save()
  await category2.save()
  await category3.save()
  await category4.save()
  await category5.save()
  await category6.save()
  await category7.save()
  await category8.save()
  await category9.save()
  await category10.save()
  await category11.save()
  await category12.save()
  await post1.save()
  await post2.save()
  await post3.save()
  await post4.save()
  await post5.save()
  await post6.save()
  await post7.save()
  await post8.save()
  await post9.save()
  await post10.save()
  await post11.save()
  await post12.save()
  await post13.save()
  await post14.save()
  await post15.save()
  await post16.save()
  await post17.save()
  await post18.save()
  await post19.save()
  await post20.save()
  await post21.save()
  await post22.save()
  await post23.save()
  await post24.save()
}

export default seedDb