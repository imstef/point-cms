
def update_database(form_id, data):
	query = ""
	if form_id == "general":
		query = "UPDATE settings SET website_name = '{}', website_description = '{}', author = '{}', email_address = '{}' WHERE id = 1".format(data[0], data[1], data[2], data[3])
	elif form_id == "footer":
		query = "UPDATE settings SET footer_info = '{}' WHERE id = 1".format(data[0])
	return query
# end def