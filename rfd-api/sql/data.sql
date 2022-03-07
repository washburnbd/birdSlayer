use rfd_game;

insert into game_user (username, password_hash, is_admin) 
values ('admin', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', true);
select * from game_user;

insert into player (game_user_id, current_hp, max_hp, defense, damage, boss_slain) 
values (1, 30, 30, 10, 3, false);
select * from player;

insert into weapon 
(weapon_damage) values (2);
insert into weapon 
(weapon_damage) values (4);
select * from weapon;



insert into armor
(armor_defense) values (2);
insert into armor
(armor_defense) values (4);
select * from armor;



insert into inventory (player_id) 
values (1);
select * from inventory;

insert into enemy (enemy_id,max_hp,defense,damage) 
values(1,12,10,5);
insert into enemy (enemy_id,max_hp,defense,damage) 
values(2,8,12,4);
select * from enemy;



insert into room (weapon_id, armor_id, enemy_id, layout,room_cleared) 
values (1,1,1,'Test',false);

insert into room (weapon_id, armor_id, enemy_id, layout,room_cleared) 
values (1,2,1,'Test',false);

insert into room (weapon_id, armor_id, enemy_id, layout,room_cleared) 
values (2,1,2,'Test',false);
select * from room;


