package test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Desktop;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.Page;
import org.zkoss.zk.ui.util.DesktopCleanup;

@SuppressWarnings("unchecked")
public class DesktopCleanUp implements DesktopCleanup {
	
	@Override
	public void cleanup(Desktop desktop) throws Exception {
		
		if (desktop.isServerPushEnabled()) {
			Executions.deactivate(desktop);
		}
		for (Iterator it = desktop.getPages().iterator(); it.hasNext();) {
			Page p = (Page) it.next();
			List<Component> components = new ArrayList<Component>();
			for (Iterator itc = p.getFirstRoot().getChildren().iterator(); itc
					.hasNext();) {
				Component c = (Component) itc.next();
				components.add(c);
			}
			for (Component c : components) {
				cleanupComponent(c);
			}
			components.clear();
		}
	}

	private void cleanupComponent(Component c) {
		List<Component> components = new ArrayList<Component>();
		for (Iterator it = c.getChildren().iterator(); it.hasNext();) {
			Component child = (Component) it.next();
			components.add(child);
		}
		for (Component child : components) {
			if (child.getChildren()!=null) {
				try {
				child.getChildren().clear();
				} catch (Exception e) {
					
				}
			}
		}
		if (c.getChildren()!=null) {
			try {
			c.getChildren().clear();
			} catch (Exception e) {
			}
		}
		components.clear();
	}
}
