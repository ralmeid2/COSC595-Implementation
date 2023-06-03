import mongoose, { DocumentDefinition } from 'mongoose'
import UserModel, { UserDocument } from '../model/user.model'

/*
  The service defines functions that can are called by the auth handler
  to interact with the database. 
  Usernames and passwords are stored in the database.
*/

export async function getUserByUsername(username: string) {
  return UserModel.findOne({ username }).lean()
}

export async function getUserById(id: string) {
  return UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) }).lean()
}

export async function createUser(user: DocumentDefinition<UserDocument>) {
  return UserModel.create(user)
}