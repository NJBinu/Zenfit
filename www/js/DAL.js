function deleteEntry() {


    // Reset form fields
    $("#exercise").val("running");
    $("#sets").val("");
    $("#reps").val("");
    $("#calories").text("0");
    $("#weightLoss").text("0");
    $("#camera").val("");
    $("input[name=intensity]").prop("checked", false);
    $("#notes").val("");

    deleteEntryFromDB();

    alert("entry deleted successfully!");
}