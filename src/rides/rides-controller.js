const { responseObject } = require("../utility");
const {
  insert_rides,
  fetch_rides_model,
  fetch_rides_id_model,
  insert_riders,
  fetch_riders_model,
  fetch_riders_id_model,
  insert_feedbacks,
  fetch_rideFeedBack_model,
  update_ride_status_model,
} = require("./rides-model");

const AddRideFunction = (req, res) => {
  let {
    amount,
    deliveryToken,
    sender,
    receiver,
    pickUp,
    dropOff,
    status,
    riderID,
  } = req.body;

  let payload = {
    amount,
    deliveryToken,
    sender,
    receiver,
    pickUp,
    dropOff,
    status,
    riderID,
  };
  insert_rides(payload).then((InsertRideResponse) => {
    if (InsertRideResponse.error) {
      return res.send(
        responseObject(InsertRideResponse.error.message, false, null)
      );
    }

    return res.send(
      responseObject("Ride updated", true, InsertRideResponse.data)
    );
  });
};

const GetRidesFunction = (req, res) => {
  fetch_rides_model().then((FetchRidesResponse) => {
    if (FetchRidesResponse.error) {
      return res.send(
        responseObject(FetchRidesResponse.error.message, false, null)
      );
    }

    if (FetchRidesResponse.data.length < 1) {
      return res.send(responseObject("no rides available", false, null));
    }

    return res.send(
      responseObject("All Rides fetched", true, FetchRidesResponse.data)
    );
  });
};

const GetRideByIDFunction = (req, res) => {
  let { id } = req.body;

  fetch_rides_id_model(id).then((FetchRidesResponse) => {
    if (FetchRidesResponse.error) {
      return res.send(
        responseObject(FetchRidesResponse.error.message, false, null)
      );
    }

    if (FetchRidesResponse.data.length < 1) {
      return res.send(responseObject("invalid ride", false, null));
    }

    return res.send(
      responseObject("Ride fetched", true, FetchRidesResponse.data)
    );
  });
};

const AddRiderFunction = (req, res) => {
  let { riderName, phone, agency, address, referee } = req.body;

  let riderID = Math.floor(Math.random() * 1000000);

  let payload = { riderName, riderID, phone, agency, address, referee };
  insert_riders(payload).then((InsertRiderResponse) => {
    if (InsertRiderResponse.error) {
      return res.send(
        responseObject(InsertRiderResponse.error.message, false, null)
      );
    }

    return res.send(
      responseObject("Rider updated", true, InsertRiderResponse.data)
    );
  });
};

const GetRidersFunction = (req, res) => {
  fetch_riders_model().then((FetchRidersResponse) => {
    if (FetchRidersResponse.error) {
      return res.send(
        responseObject(FetchRidersResponse.error.message, false, null)
      );
    }

    if (FetchRidersResponse.data.length < 1) {
      return res.send(responseObject("no rider available", false, null));
    }

    return res.send(
      responseObject("All Rides fetched", true, FetchRidersResponse.data)
    );
  });
};

const GetRiderByIDFunction = (req, res) => {
  let { id } = req.body;

  fetch_riders_id_model(id).then((FetchRidersResponse) => {
    if (FetchRidersResponse.error) {
      return res.send(
        responseObject(FetchRidersResponse.error.message, false, null)
      );
    }

    if (FetchRidersResponse.data.length < 1) {
      return res.send(responseObject("invalid ride", false, null));
    }

    return res.send(
      responseObject("Rider fetched", true, FetchRidersResponse.data)
    );
  });
};

const GetTripByRiderFunction = (req, res) => {
  let { riderID } = req.body;

  fetch_rideFeedBack_model(riderID).then((FetchTripResponse) => {
    if (FetchTripResponse.error) {
      return res.send(
        responseObject(FetchTripResponse.error.message, false, null)
      );
    }

    if (FetchTripResponse.data.length < 1) {
      return res.send(responseObject("no trip available", false, null));
    }

    return res.send(
      responseObject("All Trips fetched", true, FetchTripResponse.data)
    );
  });
};

const AddFeedbackFunction = (req, res) => {
  let { customerName, customerID, phone, review, status, rideID } = req.body;

  let payload = { customerName, customerID, phone, review, status, rideID };
  insert_feedbacks(payload).then((InsertFeedbackResponse) => {
    if (InsertFeedbackResponse.error) {
      return res.send(
        responseObject(InsertFeedbackResponse.error.message, false, null)
      );
    }

    return res.send(
      responseObject("Feedback added", true, InsertFeedbackResponse.data)
    );
  });
};

const GetFeedbacksFunction = (req, res) => {
  let { rideID } = req.body;

  fetch_rideFeedBack_model(rideID).then((FetchRideFeedbackResponse) => {
    if (FetchRideFeedbackResponse.error) {
      return res.send(
        responseObject(FetchRideFeedbackResponse.error.message, false, null)
      );
    }

    if (FetchRideFeedbackResponse.data.length < 1) {
      return res.send(responseObject("no feedback available", false, null));
    }

    return res.send(
      responseObject(
        "All feedbacks fetched",
        true,
        FetchRideFeedbackResponse.data
      )
    );
  });
};

const UpdateRideStatusFunction = (req, res) => {
  let { id, riderID, status } = req.body;

  if (status == true) {
    let newStatus = "Approved";

    let payload = { id, riderID, newStatus };
    update_ride_status_model(payload).then((StatusUpdateResponse1) => {
      if (StatusUpdateResponse1.error) {
        return res.send(
          responseObject(StatusUpdateResponse1.error.message, false, null)
        );
      }

      return res.send(
        responseObject("status updated", true, StatusUpdateResponse1.data)
      );
    });

    if (status == false) {
      let newStatus = "Approved";

      let payload = { id, riderID, newStatus };
      update_ride_status_model(payload).then((StatusUpdateResponse2) => {
        if (StatusUpdateResponse2.error) {
          return res.send(
            responseObject(StatusUpdateResponse2.error.message, false, null)
          );
        }

        return res.send(
          responseObject("status updated", true, StatusUpdateResponse2.data)
        );
      });
    }
  }
};

module.exports = {
  AddRideFunction,
  GetRidesFunction,
  GetRideByIDFunction,
  AddRiderFunction,
  GetRidersFunction,
  GetRiderByIDFunction,
  AddFeedbackFunction,
  GetFeedbacksFunction,
  GetTripByRiderFunction,
  UpdateRideStatusFunction,
};
