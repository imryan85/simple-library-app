const BookLended = require('../../models/BookLended');
const {
  queueEmail,
} = require('../email/controller')

module.exports.getOverdueBookIds = async () => {
  try {
    const results = await BookLended
      .find({ 
        dueDate: { $lt: new Date() },
        isOverdueNotified: false,
      })
      .select("_id")
      .exec();

    return results;
  } catch (err) {
    throw err;
  } 
}

module.exports.handleOverdueBook = async (bookLendedId) => {
  try {
    const data = await BookLended
      .findById(bookLendedId)
      .populate('user')
      .populate('book')
      .exec();

    const email = data.user.email;
    const bookTitle = data.book.title;

    await queueEmail(
      email, 
      `${bookTitle} is overdue`, 
      `${bookTitle} is overdue. Please return ASAP.`,
      `${bookTitle} is overdue. Please return ASAP.`,
    );

    await BookLended.findByIdAndUpdate(bookLendedId, { isOverdueNotified: true });

    return `${bookTitle} is overdue. Email notification is queued for ${email}.`;
  } catch (err) {
    throw err;
  } 
}