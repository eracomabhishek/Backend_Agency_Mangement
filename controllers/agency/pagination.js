const agencies = require('../../data'); // Adjust the path based on your project structure

// exports.pagination = async (req, res) => {
//     const { page = 1, limit = 5, agencyName, vehicleName, vehicleType } = req.query;
//   console.log("hahahahahahah")
//     // Flatten vehicles with agencyName into a single array
//     let vehicles = agencies.flatMap((agency) =>
//         agency.vehicles.map((vehicle) => ({
//             ...vehicle,
//             agencyName: agency.agencyName,
//         }))
//     );

//     // Apply filters
//     if (agencyName) {
//         vehicles = vehicles.filter((vehicle) =>
//             vehicle.agencyName.toLowerCase().includes(agencyName.toLowerCase())
//         );
//     }
//     if (vehicleName) {
//         vehicles = vehicles.filter((vehicle) =>
//             vehicle.vehicleName.toLowerCase().includes(vehicleName.toLowerCase())
//         );
//     }
//     if (vehicleType) {
//         vehicles = vehicles.filter((vehicle) =>
//             vehicle.vehicleType.toLowerCase().includes(vehicleType.toLowerCase())
//         );
//     }

//     // Paginate the results
//     const totalVehicles = vehicles.length;
//     const startIndex = (page - 1) * limit;
//     const paginatedVehicles = vehicles.slice(startIndex, startIndex + parseInt(limit));

//     // Send response
//     res.json({
//         success: true,
//         data: paginatedVehicles,
//         pagination: {
//             currentPage: parseInt(page),
//             totalPages: Math.ceil(totalVehicles / limit),
//             totalVehicles,
//         },
//     });
// };

exports.pagination = async (req, res) => {
    const { page = 1, limit = 5, agencyName, vehicleName, vehicleType } = req.query;
    console.log("Fetching vehicles with pagination...");

    // Flatten vehicles with agencyName into a single array
    let vehicles = agencies.flatMap((agency) =>
        agency.vehicles.map((vehicle) => ({
            ...vehicle,
            agencyName: agency.agencyName,
        }))
    );

    // console.log("aggg",vehicles)
  
    // Apply filters
    if (agencyName) {
        vehicles = vehicles.filter((vehicle) =>
            vehicle.agencyName.toLowerCase().includes(agencyName.toLowerCase())
        );
    }
    if (vehicleName) {
        vehicles = vehicles.filter((vehicle) =>
            vehicle.vehicleName.toLowerCase().includes(vehicleName.toLowerCase())
        );
    }
    if (vehicleType) {
        vehicles = vehicles.filter((vehicle) =>
            vehicle.vehicleType.toLowerCase().includes(vehicleType.toLowerCase())
        );
    }

    // Paginate the results
    const totalVehicles = vehicles.length;
    const startIndex = (page - 1) * limit;
    const paginatedVehicles = vehicles.slice(startIndex, startIndex + parseInt(limit));

    // Send response
    res.json({
        success: true,
        data: paginatedVehicles,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalVehicles / limit),
            totalVehicles,
        },
    });
};

exports.options = async  (req, res) => {
    const agencyNames = [...new Set(agencies.map((agency) => agency.agencyName))];
    const vehicleTypes = [
      ...new Set(agencies.flatMap((agency) => agency.vehicles.map((v) => v.vehicleType))),
    ];
    const vehicleNames = [
      ...new Set(agencies.flatMap((agency) => agency.vehicles.map((v) => v.vehicleName))),
    ];
  
    res.json({ agencyNames, vehicleTypes, vehicleNames });
  };

