package h5chart.events;

import java.util.Map;

import org.zkoss.zk.au.AuRequest;
import org.zkoss.zk.au.AuRequests;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.event.Event;

public class ClearEvent extends Event {
	private final boolean _cleared;
    
    public static final ClearEvent getClearEvent(AuRequest request) {
            final Component comp = request.getComponent();
            final Map data=request.getData();
            
            boolean cleared = AuRequests.getBoolean(data, "cleared");
            return new ClearEvent(request.getCommand(), comp, cleared);
    }
    
    public ClearEvent(String name, Component target, boolean cleared) {
            super(name, target);
            this._cleared = cleared;            
    }
    
    public final boolean getCleared() {
            return this._cleared;
    }
    
    public static final String NAME = "onClear";
}
