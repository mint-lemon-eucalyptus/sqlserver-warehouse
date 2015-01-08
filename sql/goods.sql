DROP TABLE Goods;

CREATE TABLE "Goods" (
  id    INT IDENTITY PRIMARY KEY,
  name  VARCHAR(50) NULL,
  maker VARCHAR(50) NULL
);


DROP FUNCTION selectAllGoods;
CREATE FUNCTION selectAllGoods()
  RETURNS @goodstable TABLE
  (
  ID INT,
  Name VARCHAR(50),
  maker VARCHAR(50)
  )
AS
  BEGIN
    INSERT @goodstable
      SELECT id, name, maker
      FROM goods
    RETURN
  END


DROP PROCEDURE addGood;
CREATE PROCEDURE addGood
    @_name VARCHAR(50), @_maker VARCHAR(50), @new_identity INT OUTPUT
AS
  BEGIN
    SET NOCOUNT ON

    INSERT INTO goods (name, maker) VALUES (@_name, @_maker)

    SELECT @new_identity = SCOPE_IDENTITY()

    SELECT @new_identity AS id

    RETURN
  END


  DROP FUNCTION updateGoodData;
  CREATE PROCEDURE updateGoodData(@id INT, @name VARCHAR(50), @maker VARCHAR(50))
  AS
    BEGIN
      UPDATE goods
      SET
        name  = coalesce(@name, (SELECT name
                                 FROM goods
                                 WHERE id = @id)),
        maker = coalesce(@maker, (SELECT maker
                                  FROM goods
                                  WHERE id = @id))
      OUTPUT INSERTED.*
      WHERE id = @id
    END
