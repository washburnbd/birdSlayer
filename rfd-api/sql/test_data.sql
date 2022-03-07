use rfd_game_test;

insert into game_user (username, password_hash, is_admin) 
values ('admin', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', true);
select * from game_user;


select * from player;
select * from room;
select* from weapon;

select * from inventory;
select * from inventory_armor;
select * from inventory_weapon;
insert into weapon 
(weapon_id, weapon_damage) values (0,0);
insert into weapon 
(weapon_id, weapon_damage) values (1,4);
insert into weapon 
(weapon_id, weapon_damage) values (2,6);
insert into weapon
(weapon_id,weapon_damage) values (3,8);
select * from weapon;



insert into armor
(armor_id,armor_defense) values (0,0);
insert into armor
(armor_id,armor_defense) values (1,2);
insert into armor
(armor_id,armor_defense) values (2,4);
insert into armor 
(armor_id,armor_defense) values (3,6);

select * from armor;
select * from player;
select * from room;

insert into enemy (enemy_id,max_hp,defense,damage) 
values(0,0,0,0);
insert into enemy (enemy_id,max_hp,defense,damage) 
values(1,12,10,5);
insert into enemy (enemy_id,max_hp,defense,damage) 
values(2,8,12,4);
insert into enemy (enemy_id,max_hp,defense,damage)
values(3,16,14,3);
select * from enemy;
insert into enemy (enemy_id,max_hp,defense,damage)
values (4,60,20,5);



