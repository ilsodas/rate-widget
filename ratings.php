<?php

$servername = "localhost";//Host
$username = "root";//Username
$password = "root";//Password
$dbname = "database";//Database

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $name = $request->name;
  $email = $request->email;
  $message = $request->message;
  $rating = $request->rating;

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO rate (name, email, message, rating, status, rated_at)
  VALUES ('$name', '$email', '$message', '$rating', '0', now())";

  if ($conn->query($sql) === TRUE) {
      echo json_encode(array("status" => true, "title" => "Inserted", "message"=>"Yay"));
  } else {
      echo json_encode(array("status" => false, "title" => "NOT Inserted", "message"=>"NOT Yay"));
  }

  $conn->close();
}elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT id, name, email, message, rating, status, rated_at FROM rate ORDER BY rated_at DESC";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $arr = [];
    $inc = 0;
    while ($row = $result->fetch_assoc()) {
        # code...
        $jsonArrayObject = array(
          "ratingsData" => (
            array(
              'id' => (int)$row["id"],
              'name' => $row["name"],
              'email' => $row["email"],
              'message' => $row["message"],
              'rating' => (int)$row["rating"],
              'RatingRead' => (int)$row["status"],
              'date' => $row["rated_at"]
            )
          )
        );
        $arr[$inc] = $jsonArrayObject;
        $inc++;
    }
    $json_array = json_encode($arr);
    echo $json_array;
  }
  else{
    echo "0 results";
  }

  $conn->close();

}elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $id = $request->id;

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $upadateType = "$_SERVER[REQUEST_URI]";
  $typeID = substr($upadateType, 16);

  $sql = "UPDATE rate SET status = $typeID WHERE id = $id";

  if ($conn->query($sql) === TRUE) {
      echo json_encode(array("success" => true));
  } else {
    echo json_encode(array("success" => false));
  }

  $conn->close();
}

?>
