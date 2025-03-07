const supabase = require("../../config/supaconfig_index");

function insert_rides(payload) {
  return supabase
    .from("Rides")
    .insert([
      {
        amount: payload.amount,
        deliveryToken: payload.deliveryToken,
        sender: payload.sender,
        receiver: payload.receiver,
        pickUp: payload.pickUp,
        dropOff: payload.dropOff,
        status: payload.status,
      },
    ])
    .select();
}

function insert_riders(payload) {
  return supabase
    .from("Riders")
    .insert([
      {
        riderName: payload.riderName,
        riderID: payload.riderID,
        phoneNumber: payload.phone,
        agency: payload.agency,
        address: payload.address,
        referee: payload.referee,
      },
    ])
    .select();
}

function insert_feedbacks(payload) {
  return supabase
    .from("ride_feedbacks")
    .insert([
      {
        customerName: payload.customerName,
        customerID: payload.customerID,
        phoneNumber: payload.phone,
        review: payload.review,
        status: payload.status,
        rideID: payload.rideID,
      },
    ])
    .select();
}

function fetch_rides_model() {
  return supabase.from("Rides").select("*");
}

function fetch_rides_id_model(payload) {
  return supabase.from("Rides").select("*").eq("id", payload);
}

function fetch_riders_model() {
  return supabase.from("Riders").select("*");
}

function fetch_riders_id_model(payload) {
  return supabase.from("Riders").select("*").eq("id", payload);
}

function fetch_rideFeedBack_model(payload) {
  return supabase.from("ride_feedbacks").select("*").eq("rideID", payload);
}

function fetch_tripByRider_model(payload) {
  return supabase.from("rides").select("*").eq("riderID", payload);
}

function update_ride_status_model(payload) {
  return supabase
    .from("Rides")
    .update({ status: payload.newStatus, riderID: payload.riderID })
    .eq("id", payload.id)
    .select();
}

module.exports = {
  insert_rides,
  insert_riders,
  insert_feedbacks,
  fetch_rideFeedBack_model,
  fetch_riders_id_model,
  fetch_riders_model,
  fetch_rides_id_model,
  fetch_rides_model,
  fetch_tripByRider_model,
  update_ride_status_model,
};
