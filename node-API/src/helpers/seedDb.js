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
    text: 'Ik ben een forumpost 1',
    user: user1.id,
    category: category1.id
  })
  const post2 = new models.Post({
    text: 'Ik ben een forumpost 2',
    user: user2.id,
    category: category1.id
  })
  const post3 = new models.Post({
    text: 'Ik ben een forumpost 3',
    user: user2.id,
    category: category1.id
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
}

export default seedDb