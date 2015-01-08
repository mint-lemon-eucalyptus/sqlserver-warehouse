перед выполнением запроса пользователя фильтровать ключевые слова(create. delete, index,merge,set,unique)
так пользователь не сможет сломать что либо
насчет using scan(на этапе выборки тоже фильтровать)
проверочные базы = набор подграфов с метками уникальными
MATCH (m:myLabel)
USING SCAN m:myLabel

RETURN m



или


/forum/asdas.asd
/auth/asdasd

/asdsa/auth


//MATCH (m:myLabel{property_name:'property_value'})
//MATCH (a)-[r]-(b)
//MATCH (a:myLabel)-[r]-(b:myLabel)
MATCH (a:balloon)-[r]-(b)
USING SCAN a:balloon
RETURN a,r,b
USING SCAN a:myLabel
//USING SCAN b:myLabel
RETURN a,r,b



--разобраться с условиями в render index там запрос на авторизацию идет при каждом обращении к странице
пробелы в начале и конце емаила и пароля


для отслеживания обращений пользователей к статьям и упражнениям завести таблицу access history(user, material, first, last)

надо будет передавать название метки при выполнении стороннего запроса
добавить управление упражнениями


            match (a:balloon:ds)
using scan a:balloon
            return a limit 12;

START person=node:Person(name = 'Anakin')
RETURN person




Вот первая задача, на которой можно тестировать сервис:
-----------
// вывести имена белых квадратов
MATCH (a:balloon)-[r]->(b)
with b.q_name as name, sum(r.b_vol) as tot
where tot=765
RETURN name
order by name
-----------
По этому поводу:
1. Правильность решения не должна зависеть от сортировки.
2. От заголовков (алиасов) тоже.
3. Если для проверки задачи нет отдельных проверочных баз, должна использоваться общая (скрытая). Скрипт ее создания я могу подготовить на основе имеющейся у нас.
Что должно в ней отличаться? Метки? Узлов, связей, или того и другого?

