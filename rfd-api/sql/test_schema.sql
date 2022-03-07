drop database if exists rfd_game_test;
create database rfd_game_test;
use rfd_game_test;

create table game_user(
	game_user_id int primary key auto_increment,
    username varchar(50) not null,
    password_hash varchar(2048) not null,
    is_admin boolean default false
);

create table player(
	player_id int primary key auto_increment,
    game_user_id int not null,
    equipped_weapon_id int default 0,
    equipped_armor_id int default 0,
    current_hp int not null,
    max_hp int not null,
    defense int not null,
    damage int not null,
    boss_slain boolean not null,
    constraint fk_player_game_user_id
		foreign key(game_user_id)
        references game_user(game_user_id)
);

create table weapon(
	weapon_id int primary key,
    weapon_damage int not null
);


create table armor(
	armor_id int primary key,
    armor_defense int not null
);


create table inventory(
	inventory_id int primary key auto_increment,
    player_id int not null,
    constraint fk_inventory_player_id
		foreign key(player_id)
        references player(player_id)
);

create table inventory_weapon(
	inventory_id int not null,
    weapon_id int not null,
    constraint pk_inventory_weapon
		primary key(inventory_id, weapon_id),
	constraint fk_inventory_weapon_inventory_id
		foreign key (inventory_id)
        references inventory(inventory_id),
	constraint fk_inventory_weapon_weapon_id
		foreign key (weapon_id)
        references weapon(weapon_id)
);

create table inventory_armor(
	inventory_id int not null,
    armor_id int not null,
    constraint pk_inventory_armor
		primary key(inventory_id, armor_id),
	constraint fk_inventory_armor_inventory_id
		foreign key (inventory_id)
        references inventory(inventory_id),
	constraint fk_inventory_armor_armor_id
		foreign key (armor_id)
        references armor(armor_id)
);


create table enemy(
	enemy_id int primary key not null,
    max_hp int not null,
    defense int not null,
    damage int not null
);

create table room(
	room_id int primary key auto_increment,
    player_id int not null,
    weapon_id int not null,
    armor_id int not null,
    enemy_id int not null,
    enemy_hp int default 0,
    layout varchar(50) not null,
    room_cleared boolean not null,
    
    constraint fk_room_player_id
		foreign key(player_id)
        references player(player_id),
    constraint fk_room_weapon_id
		foreign key(weapon_id)
        references weapon(weapon_id),
	constraint fk_room_armor_id
		foreign key(armor_id)
        references armor(armor_id),
	constraint fk_room_enemy_id
		foreign key(enemy_id)
        references enemy(enemy_id)
);







