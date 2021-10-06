"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const grpc_definition = require("faskes-proto-integration");
// const fs_1 = require("fs");
// const args = process.argv.slice(2);
// const isSecure = args[0] || false;
// console.log('isSecure ', isSecure);
const host = "localhost";
const port = ":50051";
const server = new grpc.Server();
// const cacert = fs_1.readFileSync("certs/ca.crt"), cert = fs_1.readFileSync("certs/server.crt"), key = fs_1.readFileSync("certs/server.key"), kvpair = {
//     private_key: key,
//     cert_chain: cert,
// };
const creds = grpc.ServerCredentials.createInsecure();
// isSecure ? grpc.ServerCredentials.createSsl(cacert, [kvpair])

function faskesList(call, callback) {
  let res = new grpc_definition.FaskesResponse();
  res.setDataList(grpc_definition.Provider['test'])
  callback(null, res);
}
// "type": "FeatureCollection",
//     "features": [{
//       "type": "Feature", "properties": {
//         "counter": "0001",
//         "kode_faskes": "CKG10001",
//         "provinsi": "DKI Jakarta",
//         "kabupaten": "Jakarta Timur",
//         "ruang_lingkup": ["Klinik", "Dokter Umum", "PPK I"],
//         "nama_provider": "Poliklinik Pertamina Medan Satria",
//         "alamat": "JL. Arun IX, No. 2, RT.7/RW.4, Ujung Menteng, Cakung"
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [106.90157201690108, -6.18913175304559]
//       }
//     }]

function greeting(call, callback) {
  let req = call.request;
  let firstname = req.getFirstName();
  let lastname = req.getLastName();
  let res = new grpc_definition.HelloResponse();
  res.setMessage(`Hello ${firstname} ${lastname}!`);
  callback(null, res);
}

server.addService(grpc_definition.HelloService, { greeting });
server.addService(grpc_definition.FaskesService, { faskesList });
server.bindAsync(host + port, creds, (err, port) => {
  if (err != null) {
    return console.error(err);
  }
  server.start();
  console.log(`gRPC listening on ${port}`);
});

console.log(`GRPC is now running on ${host + port}`);
