function traerInformacionRoom(){
    $.ajax({
        url:"http://168.138.124.209:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    });
}

function pintarRespuesta2(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].hotel+"</td>";
        myTable+="<td>"+respuesta[i].stars+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button  onclick=' actualizarInformacionRoom("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button  onclick='borrarRoom("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionRoom(){
    let var2 = {
        name:$("#Cname").val(),
        hotel:$("#Chotel").val(),
        stars:$("#Cstars").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://168.138.124.209:8080/api/Room/save",
        success:function(response) {
            console.log(response);
        console.log("Se guardo correctamente");
        alert("Guardado correctamente");
        window.location.reload()
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
          window.location.reload()
        alert("No se guardo correctamente");
    }
    });
}

function actualizarInformacionRoom(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        hotel:$("#Chotel").val(),
        stars:$("#Cstars").val(),
        description:$("#Cdescription").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.124.209:8080/api/Room/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Chotel").val("");
            $("#Cstars").val("");
            $("#Cdescription").val("");
            traerInformacionRoom();
            alert("Habitación actualizada correctamente.")
        }
    });
}

function borrarRoom(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.124.209:8080/api/Room/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionRoom();
            alert("Habitación eliminado correctamente.")
        }
    });
}

function autoInicioCategorias(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://168.138.124.209:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-specialty");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}


