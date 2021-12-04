CREATE PROCEDURE public.create_user(username VARCHAR(25), password VARCHAR(75))
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
INSERT INTO users (username, password)
VALUES (username, password);
END
$BODY$;



CREATE PROCEDURE public.create_song(creator_user_id uuid, song_name VARCHAR(35), artist VARCHAR(20))
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
	is_user_valid boolean;
BEGIN
IF creator_user_id IS NULL THEN
	RAISE EXCEPTION 'creator_user_id is required';
END IF;

IF song_name IS NULL THEN
	RAISE EXCEPTION 'song_name is required';
END IF;

IF artist IS NULL THEN
	RAISE EXCEPTION 'artist is required';
END IF;

SELECT EXISTS (SELECT users.user_id FROM users WHERE users.user_id = creator_user_id) INTO is_user_valid;

IF is_user_valid IS NOT TRUE THEN
	RAISE EXCEPTION 'user id is invalid';
END IF;

INSERT INTO songs (song_name, artist, creator_user_id)
VALUES (song_name, artist, creator_user_id);
END
$BODY$;



CREATE PROCEDURE public.user_upvoted_a_song(user_id uuid, song_name VARCHAR(35), artist VARCHAR(20))
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
	is_user_valid boolean;
	is_song_valid boolean;
	is_already_upvoted boolean;
BEGIN
IF user_id IS NULL THEN
	RAISE EXCEPTION 'creator_user_id is required';
END IF;

IF song_name IS NULL THEN
	RAISE EXCEPTION 'song_name is required';
END IF;

IF artist IS NULL THEN
	RAISE EXCEPTION 'artist is required';
END IF;

SELECT EXISTS (
	SELECT 
		users.user_id 
	FROM users 
	WHERE users.user_id = user_upvoted_a_song.user_id)
	INTO is_user_valid;
	
IF is_user_valid IS NOT TRUE THEN
	RAISE EXCEPTION 'user id is invalid';
END IF;

SELECT EXISTS (
	SELECT 
		songs.song_name, 
		songs.artist 
	FROM songs
	WHERE songs.song_name = user_upvoted_a_song.song_name AND songs.artist = user_upvoted_a_song.artist)
	INTO is_song_valid;
	
IF is_song_valid IS NOT TRUE THEN
	RAISE EXCEPTION 'song is invalid';
END IF;	

SELECT EXISTS (
	SELECT 
		user_upvoted_songs.song_name, 
		user_upvoted_songs.artist,
		user_upvoted_songs.user_id
	FROM user_upvoted_songs
	WHERE 
		user_upvoted_songs.song_name = user_upvoted_a_song.song_name AND 
		user_upvoted_songs.artist = user_upvoted_a_song.artist AND
		user_upvoted_songs.user_id = user_upvoted_a_song.user_id)
	INTO is_already_upvoted;

IF is_already_upvoted IS NOT TRUE THEN
	INSERT INTO user_upvoted_songs (song_name, artist, user_id)
	VALUES (song_name, artist, user_id);
ELSE
	DELETE FROM user_upvoted_songs
	WHERE 
		user_upvoted_songs.song_name = user_upvoted_a_song.song_name AND 
		user_upvoted_songs.artist = user_upvoted_a_song.artist AND
		user_upvoted_songs.user_id = user_upvoted_a_song.user_id;
END IF;
END
$BODY$;