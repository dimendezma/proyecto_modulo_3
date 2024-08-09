$("#docsFiles").on("change", function () {
    uploadFiles(this.files[0]);
});

function uploadFiles(file_uploaded) {
    console.log("esto se recupera:" + file_uploaded)
    var formData = new FormData();
    files = $("#docsFiles")[0].files;
    my_files = my_files + "-||-" + files[0]["name"];
    console.log(my_files);
    var fileList = $("#fileList");
    console.log(files);
    console.log(files.length);
    if (files.length == 0) {
        console.log("No files selected");
    } else {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file);
            formData.append("docsFiles[]", file);
            fileList.append(
                '<li class="col-sm-12" style="font:smaller;display:flex;">' +
                file.name +
                "</li>"
            );
        }

        // Depuración: verifica que formData tenga archivos
        console.log("FormData entries:");
        for (var pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
    }

    $.ajax({
        url: urlFija + "upload_files.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(formData);
            switch (response) {
                case "No se han subido archivos o ha ocurrido un error.":
                    alert("No se han subido archivos o ha ocurrido un error.");
                    break;
                case "Método de solicitud no permitido.":
                    alert("Método de solicitud no permitido.");
                    break;
                default:
                    alert("Documentos subidos exitosamente");
                    break;
            }

            // $("#docsFiles").val('');
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error al subir los documentos");
            console.log(textStatus, errorThrown);
        },
    });
}