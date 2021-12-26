
function applyExtraSetup(sequelize) {
    const { user, rental, client, contact, clientLocation } = sequelize.models;

    // Users can have many bag Rentals on record, but a bag Rental only ever has one User renter
    user.hasMany(rental);
    rental.belongsTo(user);

    // Rentals are rented from a location and then returned to a location
    rental.belongsTo(clientLocation, {foreignKey: 'rentalLocationId'});
    rental.belongsTo(clientLocation, {foreignKey: 'returnLocationId'});
    clientLocation.hasMany(rental, { as: 'rentalLocations', foreignKey : 'rentalLocationId'});
    clientLocation.hasMany(rental, { as: 'returnLocations', foreignKey : 'returnLocationId'});

    // Clients have primary and secondary contacts.
    // Client locations have their own primary contact as well.
    client.belongsTo(contact, {foreignKey: 'primaryContactId'});
    client.belongsTo(contact, {foreignKey: 'secondaryContactId'});
    clientLocation.belongsTo(contact, {foreignKey: 'primaryContactId'});

    // Clients can have multiple locations.
    clientLocation.belongsTo(client);
    client.hasMany(clientLocation);
}

module.exports = { applyExtraSetup };