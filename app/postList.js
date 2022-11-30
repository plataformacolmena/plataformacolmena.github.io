// const postList = document.querySelector(".posts");

// export const setupPosts = (data) => {
//   if (data.length) {
//     let html = "";
//     data.forEach((doc) => {
//       const post = doc.data();
//       const li = `
//       <li class="list-group-item list-group-item-action">
//         <h5>${post.title}</h5>
//         <p>${post.content}</p>
//       </li>
//     `;
//       html += li;
//     });
//     postList.innerHTML = html;
//   } else {
//     postList.innerHTML = '<a id="btn-abrir-modal-QueEs" ><img src="./IMG/colmena_Bv1 base.png" alt="todo"></a>';
//   }
// };  

/// aca arranca la parte de pedido crud

const pddList = document.querySelector(".pdd-guardados");

export const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const pdd = doc.data();
      const td = ` 
      <tr class="result-box">
<td class="custIDPedidos text-right" scope="row">${pdd.id}</td>
  <td class="estadoP">${pdd.estado}</td>
  <td class="estadoP">${pdd.nro}</td>
  <td class="estadoP">${pdd.aprobacion}</td>
  <td class="text-center"><button type="button" class="btn btn-outline-dark edit-buttonPedido  btn-sm">Edit</button></td>
  <td class="fecharesgistroP">${pdd.marcaTiempo}</td>
  <td class="tipoPedidoP">${pdd.Tipo}</td>
  <td class="razonsocialP">${pdd.proveedor}</td>
  <td class="rubroP">${pdd.rubro}</td>
  <td class="fechapagoP">${pdd.fechaPago}</td>
  <td class="detalleP">${pdd.detalle}</td>
  <td class="netoP"></td>
  <td class="nogravadoP"></td>
  <td class="selectorimpuestoP"></td>
  <td class="percepcionesP"></td>
  <td class="resultadoimpuestoP"></td>
  <td class="totalP">${pdd.total}</td>
  <td class="tipoynrocomprobanteP">${pdd.comprobante}</td>
  <td class="text-center"><button type="button" class="btn btn-outline-dark comprobanteView-button btn-sm">Comprobante</button></td>    
  <td class="text-center"><button type="button" class="btn btn-outline-dark anexoView-button  btn-sm">Anexo</button></td>    
  <td class="formapagoP">${pdd.formaPago}</td>
  <td class="emailareaP"></td>
  <td class="nrocuiP"></td>
  <td class="datoBancarioP"></td>
  <td class="emailProveedorP">${pdd.obs}</td>  
</tr>`;
      html += td;
    });
    pddList.innerHTML = html;
  } else {
    // pddList.innerHTML = '<a id="btn-abrir-modal-QueEs" ><img src="./IMG/colmena_Bv1 base.png" alt="todo"></a>';
  }
};  


// OBJETO DE PEDIDOS



// marcaTiempo
// id
// nro
// usuario
// estado
// aprobacion
// area
// rubro
// fechaPago
// Tipo
// total
// detalle
// comprobante
// formaPago
// proveedor
// anexo
// obs




// ${pdd.pdd-usuario} no hace falta visualizarlo en la tabla de pedidos de los usuarios
//${pdd.pdd-area} no hace falta visualizarlo en la tabla de pedidos de los usuarios



/* <td class="text-center">
 <div class="btn-group" role="group">
  <button type="button" class="btn btn-warning delete-buttonpedidos d-none btn-sm">Confirm</button>
   <button type="button" class="btn btn-outline-dark before-delete-buttonpedidos btn-sm " data-buttonpedidos-state="delete">Delete</button>
    </div>
    </td>   */
