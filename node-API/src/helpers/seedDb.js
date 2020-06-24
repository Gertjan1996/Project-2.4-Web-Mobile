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
    category: 'Voetbal',
    imgPath: 'path_to_img'
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
  await post1.save()
  await post2.save()
  await post3.save()
}

export default seedDb