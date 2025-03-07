const { response } = require("express");
const {
  getUserByIdPrivate,
  UpdataUserInfoModel,

  fetch_user_phone_model,
} = require("../auth/auth-model");
const { responseObject } = require("../utility");
const { InsertNotification } = require("./transaction-model");
const {
  fetch_notification_uuid_model,
  fetch_notification_id_model,
} = require("../notification/notification-model");

const SendMoneyFunction = (req, res) => {
  let { amount, sender, reciever } = req.body;

  getUserByIdPrivate(sender).then((response1) => {
    if (response1.error) {
      return res.send(responseObject(response1.error.message, false, null));
    }
    if (response1.data.length < 1) {
      return res.send("invalid sender uuid", false, null);
    }

    getUserByIdPrivate(reciever).then((response2) => {
      if (response2.error) {
        return res.send(responseObject(response2.error.message, false, null));
      }
      if (response2.data.length < 1) {
        return res.send("invalid reciever uuid", false, null);
      }

      let senderData = response1.data.user.user_metadata;
      let recieverData = response2.data.user.user_metadata;

      if (senderData.wallet < amount) {
        return res.send(responseObject("insufficient funds", false, null));
      }

      let senderNewWalletBal = senderData.wallet - amount;
      let recieverNewWalletBal = recieverData.wallet + parseInt(amount);

      //update sender data
      let senderNewData = { wallet: senderNewWalletBal };
      let recieverNewData = { wallet: recieverNewWalletBal };

      //updating sender info
      UpdataUserInfoModel({ uuid: sender, data: senderNewData })
        .then((UpdateResponse1) => {
          if (UpdateResponse1.error) {
            return res.send(
              responseObject(UpdateResponse1.error.message, false, null)
            );
          }
        })
        .catch((error) => {
          return res.send(responseObject("a server error occured"));
        });

      //updating the reciever wallet
      UpdataUserInfoModel({ uuid: reciever, data: recieverNewData })
        .then((UpdateResponse2) => {
          if (UpdateResponse2.error) {
            return res.send(
              responseObject(UpdateResponse2.error.message, false, null)
            );
          }

          //creating notification for sender
          let payload = {
            from: sender,
            to: reciever,
            type: "Cash Transfer",
            message: "Transfer Successful",
            data: { amount: amount, WalletBallance: recieverNewWalletBal },
          };
          InsertNotification(payload)
            .then((notificationResponse) => {
              if (notificationResponse.error) {
                return res.send(
                  responseObject(
                    notificationResponse.error.message,
                    false,
                    null
                  )
                );
              }

              return res.send(
                responseObject("transfer successful", true, {
                  senderData,
                  recieverData,
                })
              );
            })
            .catch((error) => {
              console.log(error);
              return res.send(responseObject("a server error occured1"));
            });
        })
        .catch((error) => {
          console.log(error);
          return res.send(responseObject("a server error occured2"));
        });
    });
  });
};

const AddMoneyFunction = (req, res) => {
  let { user, amount } = req.body;

  getUserByIdPrivate(user).then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }
    if (response.data.length < 1) {
      return res.send("invalid uer uuid", false, null);
    }

    let userData = response.data.user.user_metadata;

    let userNewWalletBal = userData.wallet + parseInt(amount);

    //update user data
    let userNewData = { wallet: userNewWalletBal };

    UpdataUserInfoModel({ uuid: user, data: userNewData })
      .then((UpdateResponse) => {
        if (UpdateResponse.error) {
          return res.send(
            responseObject(UpdateResponse.error.message, false, null)
          );
        }
        //creating notification for sender
        let payload = {
          from: "Finaz",
          to: user,
          type: "Cash Deposit",
          message: "Deposit Successful",
          data: { amount: amount, WalletBallance: userNewWalletBal },
        };
        InsertNotification(payload).then((notificationResponse) => {
          if (notificationResponse.error) {
            return res.send(
              responseObject(notificationResponse.error.message, false, null)
            );
          }

          return res.send(responseObject("Money Added", true, userData));
        });
      })
      .catch((error) => {
        return res.send(responseObject("a server error occured"));
      });
  });
};

const RequestMoneyFunction = (req, res) => {
  let { from, amount, user } = req.body;
  let phoneNumber = `0${from.slice(-10)}`;

  fetch_user_phone_model(phoneNumber)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid phone");
      }

      let userData = response.data[0];

      let payload = {
        from: user,
        to: userData.uuid,
        type: "Cash Request",
        message: "You have a cash request of ${amount}",
        data: { amount: amount },
      };
      InsertNotification(payload).then((notificationResponse) => {
        if (notificationResponse.error) {
          return res.send(
            responseObject(notificationResponse.error.message, false, null)
          );
        }

        return res.send(responseObject("Request Successful", true, userData));
      });
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });
};

const RequestResponseFunction = (req, res) => {
  let { id, user, status, amount } = req.body;

  fetch_notification_id_model(id).then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }
    if (response.data.length < 1) {
      return res.send("invalid id");
    }
    let data1 = response.data[0];

    fetch_notification_uuid_model(user)
      .then((response2) => {
        if (response2.error) {
          return res.send(responseObject(response2.error.message, false, null));
        }
        if (response2.data.length < 1) {
          return res.send("invalid uuid");
        }

        let notifications = response2.data[0];

        if (status == false) {
          let payload = {
            from: user,
            to: notifications.from,
            type: "Request Declined",
            message: "${user} declined your cash request",
            data: { amount: amount },
          };
          InsertNotification(payload).then((notificationResponse) => {
            if (notificationResponse.error) {
              return res.send(
                responseObject(notificationResponse.error.message, false, null)
              );
            }

            return res.send(
              responseObject("transaction declined", false, response2.data)
            );
          });
        }

        getUserByIdPrivate(user).then((response1) => {
          if (response1.error) {
            return res.send(
              responseObject(response1.error.message, false, null)
            );
          }
          if (response1.data.length < 1) {
            return res.send("invalid uuid", false, null);
          }
          let payload2 = notifications.from;
          getUserByIdPrivate(payload2).then((response2) => {
            if (response2.error) {
              return res.send(
                responseObject(response2.error.message, false, null)
              );
            }
            if (response2.data.length < 1) {
              return res.send("invalid reciever uuid", false, null);
            }

            let userData = response1.data.user.user_metadata;
            let recieverData = response2.data.user.user_metadata;

            if (userData.wallet < amount) {
              return res.send(
                responseObject("insufficient funds", false, null)
              );
            }

            let userNewWalletBal = userData.wallet - amount;
            let recieverNewWalletBal = recieverData.wallet + parseInt(amount);

            //update user data
            let userNewData = { wallet: userNewWalletBal };
            let recieverNewData = { wallet: recieverNewWalletBal };

            //updating user info
            UpdataUserInfoModel({ uuid: user, data: userNewData })
              .then((UpdateResponse1) => {
                if (UpdateResponse1.error) {
                  return res.send(
                    responseObject(UpdateResponse1.error.message, false, null)
                  );
                }
              })
              .catch((error) => {
                return res.send(responseObject("a server error occured"));
              });

            //updating the reciever wallet
            UpdataUserInfoModel({
              uuid: payload2,
              data: recieverNewData,
            })
              .then((UpdateResponse2) => {
                if (UpdateResponse2.error) {
                  return res.send(
                    responseObject(UpdateResponse2.error.message, false, null)
                  );
                }

                //creating notification for sender
                let payload3 = {
                  from: user,
                  to: payload2,
                  type: "Request Accepted",
                  message: "${user} accepted your requst of ${amount}",
                  data: {
                    amount: amount,
                    WalletBallance: recieverNewWalletBal,
                  },
                };
                InsertNotification(payload3)
                  .then((notificationResponse) => {
                    if (notificationResponse.error) {
                      return res.send(
                        responseObject(
                          notificationResponse.error.message,
                          false,
                          null
                        )
                      );
                    }

                    return res.send(
                      responseObject("transfer successful", true, {
                        userData,
                        recieverData,
                      })
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                    return res.send(responseObject("a server error occured1"));
                  });
              })
              .catch((error) => {
                console.log(error);
                return res.send(responseObject("a server error occured2"));
              });
          });
        });
      })
      .catch((error) => {
        return res.send(responseObject(error));
      });
  });
};

module.exports = {
  SendMoneyFunction,
  AddMoneyFunction,
  RequestMoneyFunction,
  RequestResponseFunction,
};
