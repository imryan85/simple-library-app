const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const {
  queueEmail,
  sendEmail,
} = require('./controller');

jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn()
  };
});

jest.mock("axios", () => {
  return {
    post: jest.fn(),
  }
})

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
})

const msg = { 
  to: "imryan85@gmail.com", 
  subject: "This is test email", 
  text: "This is test email", 
  html: "This is test email",
};

describe("Queue email", () => {

  it("should queue email", async () => {    
    axios.post.mockResolvedValue({ status: 200 });
    const output = await queueEmail(msg.to, msg.subject, msg.text, msg.html);
    expect(output).toBe("Email queued");
  })  

  it("should throw error when fail to queue email", async () => {    
    axios.post.mockRejectedValue(new Error({ status: 400 }))  
    await expect(
      queueEmail(msg.to, msg.subject, msg.text, msg.html)
    ).rejects.toThrow();
  })  

})

describe("Send email", () => {

  it("should sends email", async () => {    
    const mResponse = "Email sent";
    sgMail.setApiKey.mockImplementation(() => {});
    sgMail.send.mockResolvedValue(mResponse);
    const output = await sendEmail(msg.to, msg.subject, msg.text, msg.html);
    expect(output).toBe(mResponse);
  })  

  it("should throw error when fail to send email", async () => {    
    const mResponse = "Failed to send email"; 
    sgMail.setApiKey.mockImplementation(() => {});
    sgMail.send.mockRejectedValue(new Error(mResponse))   
    await expect(
      sendEmail(msg.to, msg.subject, msg.text, msg.html)
    ).rejects.toThrow();
  })  

})