--при удалении транзакции удалить позиции товаров по ИД из таблицы Positions
CREATE TRIGGER [dbo].[onTransactionRollBack] ON [dbo].[transactions] AFTER DELETE
AS
  BEGIN
    DELETE FROM positions
    WHERE tr_id IN (SELECT id
                    FROM deleted)
  END

