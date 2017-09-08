
def update_database(connection, form_id, data):
	query = ""
	for i in range(0, len(data)):
		data[i] = data[i].replace("'", "\\'")
		data[i] = data[i].replace('"', '\\"')

	if form_id == "general":
		query = """UPDATE settings SET website_name = '{}', website_description = '{}', author = '{}', email_address = '{}' WHERE id = 1""".format(data[0], data[1], data[2], data[3])

	elif form_id == "footer":
		query = """UPDATE settings SET footer_info = '{}' WHERE id = 1""".format(data[0])

	elif form_id.startswith("section-blank"):
		form_id = form_id.replace("section-blank-", "")
		old_position = connection.execute_query("""SELECT position FROM section_list WHERE class_id = '{}'""".format(form_id))
		new_position = int(data[0])
		connection.execute_query("""UPDATE section_list SET position = {} WHERE position = {}""".format(int(old_position[0]["position"]), new_position))
		connection.execute_query("""UPDATE section_list SET position = {}, title = '{}', description = '{}' WHERE class_id = '{}'""".format(new_position, data[1], data[2], form_id))
		bid = connection.execute_query("SELECT bid FROM template_blank JOIN section_list USING (sid) WHERE class_id = '{}'".format(form_id))
		query = """UPDATE template_blank SET content = '{}' WHERE bid = {} """.format(data[3], int(bid[0]["bid"]))

	elif form_id == "section-add":
		query = """SELECT IFNULL(MAX(position), 0) as position FROM section_list"""
		position = int(connection.execute_query(query)[0]["position"]) + 1
		class_id = data[0].lower()
		if data[0].strip() == "":
			query = """SELECT MAX(sid) as sid FROM section_list"""
			sid = connection.execute_query(query)[0]["sid"]
			class_id = "section" + str(sid)
		query = """INSERT INTO section_list(title, description, position, class_id, tid) VALUES('{}', '{}', {}, '{}', {})""".format(data[0], data[1], position, class_id, int(data[2]))
		connection.execute_query(query)
		query = """SELECT sid FROM section_list WHERE position = {}""".format(position)
		sid = int(connection.execute_query(query)[0]["sid"])
		if data[2] == "1":
			query = """INSERT INTO template_blank (sid, content) VALUES({}, ' ')""".format(sid)
		elif data[2] == "2":
			query = """INSERT INTO template_portfolio (sid) VALUES({})""".format(sid)

	elif form_id.startswith("section-portfolio"):
		form_id = form_id.replace("section-portfolio-", "")
		old_position = connection.execute_query("""SELECT position FROM section_list WHERE class_id = '{}'""".format(form_id))
		new_position = int(data[0])
		connection.execute_query("""UPDATE section_list SET position = {} WHERE position = {}""".format(int(old_position[0]["position"]), new_position))
		query = """UPDATE section_list SET position = {}, title = '{}', description = '{}' WHERE class_id = '{}'""".format(new_position, data[1], data[2], form_id)

	elif form_id.startswith("item-add"):
		form_id = form_id.replace("item-add-", "")
		query = """SELECT tpid FROM template_portfolio JOIN section_list USING (sid) WHERE class_id = '{}'""".format(form_id)
		tpid = connection.execute_query(query)[0]["tpid"]
		query = """INSERT INTO template_portfolio_projects (title, description, modal_content, logo, technologies, link, link_icon, tpid, cid) VALUES('{}', '{}', '{}', '{}', '{}', '{}', '{}', {}, {})""".format(data[0], data[1], data[2], data[3], data[4], data[5], data[6], tpid, int(data[7]))

	elif form_id.startswith("delete-item"):
		query = "DELETE FROM template_portfolio_projects WHERE pid = {}".format(str(data[0]))
	
	elif form_id.startswith("item-project"):
		form_id = form_id.replace("item-project-", "")
		query = """UPDATE template_portfolio_projects SET title = '{}', description = '{}', modal_content = '{}', logo = '{}', technologies = '{}', link = '{}', link_icon = '{}', cid = {}, tpid = {} WHERE pid = {}""".format(data[0], data[1], data[2], data[3], data[4], data[5], data[6], int(data[7]), int(data[8]), int(form_id))
    
	elif form_id.startswith("section-delete"):
		form_id = form_id.replace("section-delete-", "")
		query = """DELETE FROM section_list WHERE class_id = '{}' """.format(form_id)
	
	elif form_id.startswith("portfolio-category-add"):
		query = """SELECT (MAX(position) + 1) as position FROM template_portfolio_categories """
		position = connection.execute_query(query)[0]["position"]
		query = """INSERT INTO template_portfolio_categories(category, position) VALUES('{}', {})""".format(data[0], int(position)) 

	elif form_id.startswith("portfolio-category-name-change"):
		query = """UPDATE template_portfolio_categories SET category = '{}' WHERE category = '{}'""".format(data[1], data[0])

	elif form_id.startswith("portfolio-category-remove"):
		query = """DELETE FROM template_portfolio_categories WHERE category = '{}'""".format(data[0])

	elif form_id.startswith("theme-settings"):
		query = """UPDATE settings SET theme = '{}', homepage_color = '{}', dashboard_color = '{}' """.format(data[0], data[2], data[1])	

	return query
# end def