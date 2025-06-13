import plotly.graph_objects as go

def plot_against_data(function, x_range, xdata, ydata, title, yaxis_title, xaxis_title="t"):
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=xdata,
        y=ydata,
        mode='markers',
        name='Data Points',
        line=dict(width=2)
    ))
    fig.add_trace(go.Scatter(
        x=x_range,
        y=function(x_range),
        mode='lines',
        name='Modelled Function',
        line=dict(width=2)
    ))
    fig.update_layout(
        title=title,
        xaxis_title=xaxis_title,
        yaxis_title=yaxis_title,
        legend=dict(yanchor="top", y=0.99, xanchor="left", x=0.01),
        hovermode="x unified",
        template="plotly_white",  # or use another template like "plotly_dark"
        showlegend=True
    )
    return fig